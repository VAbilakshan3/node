const Store = require('./modal');

exports.isAuth = (req, res, next) => {
    if(req.headers.authorization !== process.env.AUTH){
        return res.status(401).json({error: "authorization fail"})
    }
    next();
}

exports.storeById = (req, res, next, id) => {
    Store.findById(id).exec((err, store) => {
        if(err || !store){
            return res.status(400).json({
                error:'store not found'
            });
        }
        req.store = store;
        next();
    });
}

exports.create = (req, res) => {
    const store = new Store(req.body);
    store.save((err, data) => {
        if(err){
            return res.status(400).json({
                error:"Don't empty fields"
            });
        }
        res.json({data});
    });
}

exports.read = (req, res) => {
    Store.find((err, data) => {
        if(err){
            return res.status(400).json({
                error:"Something went wrong"
            });
        }
        res.json({data});
    });
}

exports.search = (req, res) => {
    Store.find({ $or: [{title: { $regex: req.query.query }}, {description: { $regex: req.query.query }}]})
    .exec((err, data) => {
        if(err){
            return res.status(400).json({
                error:"No results found"
            });
        }
        res.json({data});
    });
}

exports.update = (req, res) => {
    Store.findOneAndUpdate(
        {_id: req.store._id},
        {$set: req.body},
        {new: true},
        (err, store) => {
            if(err){
                return res.status(400).json({
                    error:"You are not authorized to perform this action"
                });
            }
            res.json({ store });
        });
}

exports.remove = (req, res) => {
    Store.findOneAndDelete({_id: req.store._id},
        (err, store) => {
            if(err){
                return res.status(400).json({
                    error:"You are not authorized to perform this action"
                });
            }
            res.json({ store });
        });
}

exports.retrieve = (req, res) => {
    Store.findOne({_id: req.store._id},
        (err, store) => {
            if(err){
                return res.status(400).json({
                    error:"You are not authorized to perform this action"
                });
            }
            res.json({ store });
        });
}