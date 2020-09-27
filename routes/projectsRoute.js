

module.exports = (app, db) => {

    app
        .route('/projects')

        .post( (req, res) => {
            const { name, desc } = req.body;

            const newProject = {
                name: name,
                description: desc,
                issues: []
            }

            db
                .insertOne(newProject, (err, data) => {
                    if ( err ) log(err);

                    // res.json(data.ops[0])
                    res.redirect('/');
                })
                
        })
}