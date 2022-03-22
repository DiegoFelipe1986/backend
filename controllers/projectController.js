import Project from "../models/Project.js"
import User from "../models/User.js";

const getProjects = async (req, res) =>{
    const projects = await Project.find({
        '$or' : [
            {'collaborator': {$in: req.user}},
            {'creator': {$in: req.user}}
        ]
    });
    res.json(projects);
}

const newProject = async (req, res) =>{
    const project = new Project(req.body);
    project.creator = req.user._id;

    try {
        const projectSaved = await project.save();
        res.json(projectSaved);
    } catch (error) {
        console.log(error);
    }
}

const getProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id)
    .populate('tasks').populate('collaborator', 'name email');

    if (!project) {
        const error = new Error("Not found");
        return res.status(404).json({ msg: error.message })
    }

    if (project.creator.toString() !== req.user._id.toString() && !project.collaborator
    .some(collaborator => collaborator._id.toString() === req.user._id.toString())) {
        const error = new Error("Action not valid");
        return res.status(404).json({ msg: error.message })
    }

    res.json(project);
}

const editProject = async (req, res) =>{

    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
        const error = new Error("Not found");
        return res.status(404).json({ msg: error.message })
    }

    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Action not valid");
        return res.status(401).json({ msg: error.message })
    }

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.deliverDate = req.body.deliverDate || project.deliverDate;
    project.client = req.body.client || project.client;

    try {
        const projectStored = await project.save();
        res.json(projectStored);
    } catch (error) {
        console.log(error)
    }
}

const deleteProject = async (req, res) =>{
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
        const error = new Error("Not found");
        return res.status(404).json({ msg: error.message })
    }

    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Action not valid");
        return res.status(401).json({ msg: error.message })
    }

    try {
        await project.deleteOne();
        res.json({msg: "The proyect was eliminated"});
    } catch (error) {
        console.log(error)
    }
}

const searchCollaborator = async (req, res) =>{
    const {email} = req.body;

    const user = await User.findOne({email}).select('-confirmed -password -token -__v -createdAt -updatedAt ');

    if (!user) {
        const error = new Error('User not found');
        return res.status(404).json({msg: error.message});
    }

    res.json(user);
}

const addCollaborator = async (req, res) =>{
    const project = await Project.findById(req.params.id);

    if (!project) {
        const error = new Error('Project not found');
        return res.status(404).json({msg: error.message});
    }

    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Action not valid');
        return res.status(404).json({msg: error.message});
    }

    const {email} = req.body;

    const user = await User.findOne({email}).select('-confirmed -password -token -__v -createdAt -updatedAt ');

    if (!user) {
        const error = new Error('User not found');
        return res.status(404).json({msg: error.message});
    }

    if (project.creator.toString() === user._id.toString() ) {
        const error = new Error(`Admin can't add as collaborator`);
        return res.status(404).json({msg: error.message});
    }

    if (project.collaborator.includes(user._id)) {
        const error = new Error(`User already belongs to project`);
        return res.status(404).json({msg: error.message});
    }

    project.collaborator.push(user._id);
    await project.save();
    res.json({msg: 'Collaborator added successfuly'})
}

const deleteCollaborator = async (req, res) =>{
    const project = await Project.findById(req.params.id);

    if (!project) {
        const error = new Error('Project not found');
        return res.status(404).json({msg: error.message});
    }

    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Action not valid');
        return res.status(404).json({msg: error.message});
    }

    project.collaborator.pull(req.body.id);
    await project.save();
    res.json({msg: 'Collaborator deleted successfuly'})
}


export {
    getProjects,
    newProject,
    getProject,
    editProject,
    deleteProject,
    addCollaborator,
    deleteCollaborator,
    searchCollaborator
}