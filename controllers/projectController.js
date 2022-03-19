import Project from "../models/Project.js"

const getProjects = async (req, res) =>{
    const projects = await Project.find().where('creator').equals(req.user);
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
    const project = await Project.findById(id);
    if (!project) {
        const error = new Error("Not found");
        return res.status(404).json({ msg: error.message })
    }

    if (project.creator.toString() !== req.user._id.toString()) {
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
    console.log(req.body)
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

const deleteProject = async (req, res) =>{}

const addCollaborator = async (req, res) =>{}

const deleteCollaborator = async (req, res) =>{}

const getTasks = async (req, res) =>{}

export {
    getProjects,
    newProject,
    getProject,
    editProject,
    deleteProject,
    addCollaborator,
    deleteCollaborator,
    getTasks
}