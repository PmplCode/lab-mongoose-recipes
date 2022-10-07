const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model.js');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

////CRAR UNA RECEPTA NOVA AMB LA VARIABLE RECIPE1 QUE DESPRÉS LI FEM EL METODE .CREATE(RECIPE1)
const recipe1 = {
      "title": "Sopa de cebolla",
      "level": "UltraPro Chef",
      "ingredients": [
      "1/2 L de agua",
      "Cebolla",
      "Sal",
      "Especies variadas"],
      "cuisine": "Asian",
      "dishType": "soup",
      "image": "https://i.blogs.es/aa54cf/sopa_cebolla/1366_2000.jpg",
      "duration": 60,
      "creator": "Chef 日本"
    }
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany()
  })
  
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    //ITERATION 2:
    //CREAR DE RECIPE LA RECEPTA1 A LA DATABASE I AFEGIR-LA.
    // Recipe.create(recipe1)
    // .then(resultat => {
    //       // console.log("RESULTAT: ", resultat.title);
    //   })
    //   .catch(err => {
    //       console.log("ERR", err);
    //   })

    // //ITERATION 3:
    // Recipe.insertMany(data)
    // .then((recipe) => {
    //   recipe.forEach((recip, k)=> {
    //     // console.log("Title "+(k+1)+':', recip.title)
    //   })
    // })
    // .catch(err => {
    //   console.log("ERR", err);
    // })

    ////ITERATION 4:    A.findOneAndUpdate(conditions, update)
    Recipe.find({'title': "Rigatoni alla Genovese"}) //EL .FIND() RETORNA UN ARRAY D'OBJECTES QUE COMPLEIXEN EL FILTRE
    .then((recipe4) => console.log('titul:',recipe4[0].title))

    Recipe.findOneAndUpdate({'title': "Rigatoni alla Genovese"}, {duration: 100})
    .then(); //EL .THEN() EXECUTA LO QUE LI DIEM A LA PROMESA DE DALT!!!!!!!


    //ITERATION 5: Character.deleteOne({ name: 'Eddard Stark' }); // returns {deletedCount: 1}
    Recipe.find({'title': "Carrot Cake"}) //EL .FIND() RETORNA UN ARRAY D'OBJECTES QUE COMPLEIXEN EL FILTRE
    .then((recipe5) => console.log('titul:',recipe5[0].title))

    Recipe.deleteOne({title: "Carrot Cake"})
    .then((deleted) => console.log('deleted?', deleted)) //{ acknowledged: true, deletedCount: 1 }
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  process.on('SIGINT', ()=>{
        mongoose.connection.close(()=>{
            console.log("close!");
            process.exit(0);
        })
    })