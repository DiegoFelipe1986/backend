import Project from '../models/Project.js';
import Task from '../models/Task.js';

const addTask = async (req, res) => {
    const {project} = req.body;

    const existProject = await Project.findById(project);

    if(!existProject){
        const error = new Error('Project not existing');
        return res.status(404).json({msg: error.message})
    }

    if(existProject.creator.toString() !== req.user._id.toString()){
        const error = new Error(`You haven't permissions`);
        return res.status(403).json({msg: error.message})
    }

    try {
        const taskStored = await Task.create(req.body);
        res.json(taskStored);
    } catch (error) {
        console.log(error)
    }
};
const getTask = async (req, res) => {
    const {id} = req.params;

    const task = await Task.findById(id).populate('project');

    if(!task){
        const error = new Error(`Task not found`);
        return res.status(404).json({msg: error.message})
    }

    if(task.project.creator.toString() !== req.user._id.toString()){
        const error = new Error(`Action not allow`);
        return res.status(403).json({msg: error.message})
    }

    res.json(task);
};
const updateTask = async (req, res) => {};
const deleteTask = async (req, res) => {};
const changeState = async (req, res) => {};


export {
    addTask,
    getTask,
    updateTask,
    deleteTask,
    changeState
}