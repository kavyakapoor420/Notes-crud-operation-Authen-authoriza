const Note = require("../models/Note");

exports.getNotes = async (req, res) => {
    try {
        // FIX: Use Mongoose .sort() instead of Array .toSorted()
        const notes = await Note.find({ user: req.user }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'server error' });
    }
}

exports.createNotes = async (req, res) => {
    const { title, content, tags, color } = req.body;
    try {
        const note = new Note({
            user: req.user,
            title,
            content,
            tags,
            color
        });

        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(400).json({ message: 'invalid data' });
    }
}

exports.updateNotes = async (req, res) => {
    try {
        // FIX: req.param.id -> req.params.id
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user },
            req.body,
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: 'note not found' });
        }

        res.json(note);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'server error' });
    }
}

exports.deleteNote = async (req, res) => {
    try {
        // FIX: req.param.id -> req.params.id (if you used it here too, just to be safe)
        const note = await Note.findOneAndDelete({
            _id: req.params.id, 
            user: req.user
        });
        
        if (!note) {
            return res.status(404).json({ message: 'notes not found' });
        }

        res.json({ message: 'note deleted' });
    } catch (err) {
        res.status(500).json({ message: 'server error' });
    }
}