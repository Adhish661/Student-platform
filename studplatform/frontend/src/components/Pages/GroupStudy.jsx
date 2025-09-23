// frontend/src/components/Pages/GroupStudy.jsx
import { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaVideo,
  FaUsers,
  FaCopy,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideoSlash,
  FaSave,
  FaPlus,
} from 'react-icons/fa';

// Import placeholder images for participants
import userImg1 from '../../assets/aichat.jpg';
import userImg2 from '../../assets/aichat.jpg';
import userImg3 from '../../assets/aichat.jpg';

const MeetingRoom = ({ roomId, leaveRoom }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [participants, setParticipants] = useState([]);
  const localVideoRef = useRef(null);
  const remoteVideosRef = useRef(new Map()); // peerId -> HTMLVideoElement
  const socketRef = useRef(null);
  const peerConnectionsRef = useRef(new Map()); // peerId -> RTCPeerConnection
  const localStreamRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const socket = io('http://localhost:5000', { transports: ['websocket'] });
        socketRef.current = socket;

        // Join room
        socket.emit('join-room', roomId);

        socket.on('user-connected', async (peerId) => {
          await createOfferForPeer(peerId);
        });

        socket.on('webrtc-offer', async ({ from, offer }) => {
          await handleOffer(from, offer);
        });

        socket.on('webrtc-answer', async ({ from, answer }) => {
          const pc = peerConnectionsRef.current.get(from);
          if (pc) {
            await pc.setRemoteDescription(new RTCSessionDescription(answer));
          }
        });

        socket.on('webrtc-ice-candidate', async ({ from, candidate }) => {
          const pc = peerConnectionsRef.current.get(from);
          if (pc && candidate) {
            try { await pc.addIceCandidate(new RTCIceCandidate(candidate)); } catch (e) { console.error(e); }
          }
        });

        socket.on('user-disconnected', (peerId) => {
          const pc = peerConnectionsRef.current.get(peerId);
          if (pc) {
            pc.close();
            peerConnectionsRef.current.delete(peerId);
          }
          setParticipants((prev) => prev.filter((p) => p.id !== peerId));
          remoteVideosRef.current.delete(peerId);
        });

        // Add self
        setParticipants((prev) => [{ id: 'local', name: 'You', isLocal: true }, ...prev]);
      } catch (err) {
        console.error('Initialization error:', err);
      }
    };

    init();

    return () => {
      // Leave room and cleanup
      try {
        if (socketRef.current) {
          socketRef.current.emit('leave-room', roomId);
          socketRef.current.disconnect();
        }
      } catch {}
      peerConnectionsRef.current.forEach((pc) => pc.close());
      peerConnectionsRef.current.clear();
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [roomId]);

  const createPeerConnection = (peerId) => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ],
    });

    // Send local tracks
    localStreamRef.current.getTracks().forEach((track) => pc.addTrack(track, localStreamRef.current));

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit('webrtc-ice-candidate', { roomId, to: peerId, candidate: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      const [remoteStream] = event.streams;
      setParticipants((prev) => {
        const exists = prev.some((p) => p.id === peerId);
        if (exists) return prev;
        return [...prev, { id: peerId, name: `Peer ${peerId.slice(-4)}`, isLocal: false, stream: remoteStream }];
      });
    };

    peerConnectionsRef.current.set(peerId, pc);
    return pc;
  };

  const createOfferForPeer = async (peerId) => {
    const pc = createPeerConnection(peerId);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socketRef.current.emit('webrtc-offer', { roomId, to: peerId, offer });
  };

  const handleOffer = async (fromPeerId, offer) => {
    let pc = peerConnectionsRef.current.get(fromPeerId);
    if (!pc) pc = createPeerConnection(fromPeerId);
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socketRef.current.emit('webrtc-answer', { roomId, to: fromPeerId, answer });
  };

  return (
    <div className="bg-gray-900 min-h-[80vh] rounded-xl p-6 flex flex-col space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <FaVideo className="text-green-500 text-xl" />
          <h2 className="text-white font-semibold text-lg">Room: {roomId}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-green-500 flex items-center space-x-1">
            <FaUsers /> <span>{participants.length} participants</span>
          </span>
          <button
            onClick={() => navigator.clipboard.writeText(roomId)}
            className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition-colors"
            title="Copy room ID"
          >
            <FaCopy />
          </button>
        </div>
      </div>

      {/* Participants Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1">
        {participants.map((participant) => (
          <motion.div
            key={participant.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative bg-gray-800 rounded-xl overflow-hidden flex flex-col items-center justify-center"
          >
            {participant.isLocal ? (
              <video
                ref={localVideoRef}
                autoPlay
                muted
                className={`w-full h-60 sm:h-64 md:h-48 lg:h-56 object-cover ${isVideoOff ? 'hidden' : ''}`}
              />
            ) : (
              <video
                autoPlay
                className="w-full h-60 sm:h-64 md:h-48 lg:h-56 object-cover"
                ref={(el) => {
                  if (!el) return;
                  if (participant.stream) {
                    if (el.srcObject !== participant.stream) el.srcObject = participant.stream;
                  }
                }}
              />
            )}

            {isVideoOff && participant.isLocal && (
              <div className="w-full h-60 sm:h-64 md:h-48 lg:h-56 bg-gray-700 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                  {participant.name.charAt(0)}
                </div>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 flex justify-between items-center">
              <span className="text-white text-sm">
                {participant.name} {participant.isLocal && '(You)'}
              </span>
              {participant.isLocal && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-1 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-600'}`}
                  >
                    {isMuted ? <FaMicrophoneSlash className="text-white" /> : <FaMicrophone className="text-white" />}
                  </button>
                  <button
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`p-1 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-gray-600'}`}
                  >
                    {isVideoOff ? <FaVideoSlash className="text-white" /> : <FaVideo className="text-white" />}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Controls */}
      <div className="flex justify-center space-x-4 mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsMuted(!isMuted);
            if (localStreamRef.current) {
              localStreamRef.current.getAudioTracks().forEach((t) => (t.enabled = isMuted));
            }
          }}
          className={`px-4 py-2 rounded-full flex items-center ${isMuted ? 'bg-red-500' : 'bg-gray-700'}`}
        >
          {isMuted ? <FaMicrophoneSlash className="mr-2" /> : <FaMicrophone className="mr-2" />}
          {isMuted ? 'Unmute' : 'Mute'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const next = !isVideoOff;
            setIsVideoOff(next);
            if (localStreamRef.current) {
              localStreamRef.current.getVideoTracks().forEach((t) => (t.enabled = !next));
            }
          }}
          className={`px-4 py-2 rounded-full flex items-center ${isVideoOff ? 'bg-red-500' : 'bg-gray-700'}`}
        >
          {isVideoOff ? <FaVideoSlash className="mr-2" /> : <FaVideo className="mr-2" />}
          {isVideoOff ? 'Start Video' : 'Stop Video'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={leaveRoom}
          className="px-4 py-2 rounded-full bg-red-600 text-white flex items-center"
        >
          Leave Room
        </motion.button>
      </div>
    </div>
  );
};

const Notepad = ({ notes, setNotes, saveNotes }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
    className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden"
  >
    <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
      <h3 className="font-semibold">Study Notes</h3>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={saveNotes}
        className="bg-white text-indigo-600 px-3 py-1 rounded-md flex items-center text-sm save-button"
      >
        <FaSave className="mr-1" /> Save Notes
      </motion.button>
    </div>
    <textarea
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      placeholder="Take notes during your study session..."
      className="w-full h-64 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </motion.div>
);

const GroupStudy = () => {
  const [roomId, setRoomId] = useState('');
  const [isInRoom, setIsInRoom] = useState(false);
  const [notes, setNotes] = useState('');
  const [showSavedNotes, setShowSavedNotes] = useState(false);

  const generateRoomId = () => Math.random().toString(36).substring(2, 10);
  const createRoom = () => { const newRoomId = generateRoomId(); setRoomId(newRoomId); setIsInRoom(true); };
  const joinRoom = () => { if (roomId.trim()) setIsInRoom(true); };
  const leaveRoom = () => setIsInRoom(false);
  const saveNotes = () => localStorage.setItem(`notes-${roomId}`, notes);

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-8 px-4">
      {!isInRoom ? (
        <motion.div className="grid md:grid-cols-2 gap-6">
          {/* Create Room */}
          <motion.div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-6 rounded-xl shadow-lg flex flex-col items-center">
            <FaPlus className="text-white text-2xl mb-4" />
            <h3 className="text-white font-bold mb-2">Create New Room</h3>
            <button onClick={createRoom} className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold">
              Start
            </button>
          </motion.div>

          {/* Join Room */}
          <motion.div className="bg-gradient-to-br from-purple-500 to-indigo-500 p-6 rounded-xl shadow-lg flex flex-col items-center">
            <FaUsers className="text-white text-2xl mb-4" />
            <h3 className="text-white font-bold mb-2">Join Existing Room</h3>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room ID"
              className="mb-4 w-full px-4 py-2 rounded-lg focus:outline-none"
            />
            <button onClick={joinRoom} disabled={!roomId.trim()} className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold disabled:opacity-50">
              Join
            </button>
          </motion.div>
        </motion.div>
      ) : (
        <>
          <MeetingRoom roomId={roomId} leaveRoom={leaveRoom} />
          <Notepad notes={notes} setNotes={setNotes} saveNotes={saveNotes} />
        </>
      )}
    </div>
  );
};

export default GroupStudy;
