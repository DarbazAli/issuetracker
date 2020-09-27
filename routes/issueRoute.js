const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
    app
        .route('/projects/:project')

        .get( (req, res) => {
            let project = req.params.project;
            project = project.replace(':', '');
            // log(project);
            db.findOne({name: project}, (err, data) => {
                if ( err ) log(err);
                // log(data)
                res.render('projectDetail', {project: data})
            })
            
        })

        // POST ISSUE
        .post((req, res) => {
            // const data = req.body;
            let project =  req.params.project;
            project = project.replace(':', '');

            // console.log(project);
            const { title, text, creator, assigned_to, status }  = req.body;

            const newIssue = {
                    _id: new ObjectID(),
                    issue_title: title,
                    issue_text: text,
                    created_by: creator,
                    assigned_to: assigned_to,
                    status_text: status,
                    created_on: Date.now(),
                    updated_on: Date.now()
            }



            db.findOneAndUpdate({name: project}, 
                    {$push: {issues: newIssue}}, 
                    (err, doc) => {
                        if ( err ) console.log(err);
                        // console.log(doc);
                        res.redirect(`/projects/:${project}`)
                    })

        }) // END OF POST

        // UPDATE
        .delete( (req, res) => {
            let project =  req.params.project;
            project = project.replace(':', '');
            const id = new ObjectID( req.body.id );
            // log(id)

           db.updateOne(
               { name: project },
               { $pull: { issues: { _id: id }}},
               {new: true}
           )
           .then( data => res.redirect(`/projects/:${project}`))
           .catch( err => log(err))
        
        })
}