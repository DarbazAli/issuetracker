module.exports = (app, db) => {
    app
        .route('/projects/:project')

        .get( (req, res) => {
            let project = req.params.project;
            project = project.replace(':', '');
            // log(project);
            db.findOne({name: project}, (err, data) => {
                if ( err ) log(err);
                log(data)
                res.render('projectDetail', {project: data})
            })
            
        })
}