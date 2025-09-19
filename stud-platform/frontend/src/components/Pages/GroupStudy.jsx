// frontend/src/components/Pages/GroupStudy.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Video, Users, MessageSquare, Copy } from 'lucide-react'

const GroupStudy = () => {
  const [roomId, setRoomId] = useState('')
  const [isInRoom, setIsInRoom] = useState(false)
  const [notes, setNotes] = useState('')

  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 10)
  }

  const createRoom = () => {
    const newRoomId = generateRoomId()
    setRoomId(newRoomId)
    setIsInRoom(true)
  }

  const joinRoom = () => {
    if (roomId.trim()) {
      setIsInRoom(true)
    }
  }

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId)
  }

  const saveNotes = () => {
    // In a real app, this would save to a database
    localStorage.setItem(`notes-${roomId}`, notes)
    alert('Notes saved successfully!')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-primary"
      >
        Group Study Room
      </motion.h1>

      {!isInRoom ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card p-6 rounded-lg shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={createRoom}
              className="bg-primary text-primary-foreground p-4 rounded-lg flex flex-col items-center justify-center gap-2"
            >
              <Video size={32} />
              <span>Create New Room</span>
            </motion.button>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="p-3 border border-border rounded-lg"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={joinRoom}
                className="bg-secondary text-secondary-foreground p-3 rounded-lg"
              >
                Join Room
              </motion.button>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">How to use:</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Create a room to get a unique room ID</li>
              <li>Share the room ID with your study partners</li>
              <li>Use video, audio, and chat to collaborate</li>
              <li>Take notes together in the shared notepad</li>
            </ul>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card p-6 rounded-lg shadow-md"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Room: {roomId}</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyRoomId}
              className="flex items-center gap-1 bg-muted p-2 rounded-lg"
            >
              <Copy size={16} />
              Copy ID
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-muted rounded-lg p-4 flex items-center justify-center">
              <div className="text-center">
                <Video size={48} className="mx-auto mb-2" />
                <p className="text-muted-foreground">Video call interface would appear here</p>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users size={20} />
                Participants
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  You (Host)
                </li>
                <li className="text-muted-foreground">Waiting for others to join...</li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MessageSquare size={20} />
              Shared Notepad
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Take notes here... These will be saved with your session."
              className="w-full h-40 p-3 border border-border rounded-lg resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveNotes}
              className="mt-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg"
            >
              Save Notes
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsInRoom(false)}
            className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg"
          >
            Leave Room
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

export default GroupStudy