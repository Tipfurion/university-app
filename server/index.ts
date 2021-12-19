import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })
import authRoutes from './routes/auth'
import groupRoutes from './routes/group'
import teacherRoutes from './routes/teacher'
import studentRoutes from './routes/student'
import curriculumRoutes from './routes/curriculum'
// Create express instance
const app = express()
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/group', groupRoutes)
app.use('/api/teacher', teacherRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/curriculum', curriculumRoutes)
// Start standalone server if directly running
if (require.main === module) {
    const port = process.env.PORT || 3001
    app.listen(port, () => {
        console.log(`API server listening on port ${port}`)
    })
}
export default app
