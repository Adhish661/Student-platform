// frontend/src/components/Pages/Resources.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, Download, Trash2 } from 'lucide-react'
import { uploadFile, getFiles, deleteFile } from '../../utils/api'

const Resources = () => {
  const [files, setFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      const response = await getFiles('resources')
      setFiles(response.data)
    } catch (error) {
      console.error('Error fetching files:', error)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed!')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)

      // Simulate progress (in real app, you'd use axios progress event)
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 100)

      await uploadFile(formData)
      await fetchFiles()
      
      clearInterval(interval)
      setUploadProgress(100)
      setTimeout(() => setIsUploading(false), 500)
    } catch (error) {
      console.error('Error uploading file:', error)
      setIsUploading(false)
      alert('Error uploading file. Please try again.')
    }
  }

  const handleDeleteFile = async (fileId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await deleteFile(fileId)
        await fetchFiles()
      } catch (error) {
        console.error('Error deleting file:', error)
        alert('Error deleting file. Please try again.')
      }
    }
  }

  const handleDownload = (file) => {
    // In a real app, this would download the file
    window.open(`http://localhost:5000/${file.path}`, '_blank')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-primary"
      >
        Study Resources
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card p-6 rounded-lg shadow-md mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Upload Resources</h2>
          <div className="relative">
            <input
              type="file"
              id="resource-upload"
              accept=".pdf"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            <motion.label
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              htmlFor="resource-upload"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${
                isUploading ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'
              }`}
            >
              <Upload size={20} />
              {isUploading ? 'Uploading...' : 'Browse Files'}
            </motion.label>
          </div>
        </div>

        <AnimatePresence>
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <div className="w-full bg-muted rounded-full h-2.5">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${uploadProgress}%` }}
                  className="bg-primary h-2.5 rounded-full transition-all duration-300"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Uploading... {uploadProgress}%
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-card p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Available Resources</h2>
        
        {files.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No resources available yet. Upload some PDFs to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {files.map((file, index) => (
                <motion.div
                  key={file._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-muted p-4 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={24} className="text-primary" />
                    <div>
                      <p className="font-medium truncate max-w-xs">{file.originalName}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDownload(file)}
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg"
                    >
                      <Download size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteFile(file._id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Resources