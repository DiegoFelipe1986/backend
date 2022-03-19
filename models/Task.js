import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    state: {
        type: Boolean,
        default: false,
    },
    dateDelivery:{
        type: Date,
        required: true,
        default: Date.now(),
    },
    priority:{
        type: String,
        required: true,
        enum: ['To do','In progress', 'In QA', 'Done', 'Deployed']
    },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
export default Task;