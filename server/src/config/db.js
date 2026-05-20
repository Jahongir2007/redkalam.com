import mongoose from 'mongoose';

export const dbConnection = () => {
    mongoose.connect('mongodb://localhost:27017/redkalam')
        .then(() => {console.log('Connected to db!')})
        .catch(err => console.error(`Error occured while connection db: ${err}`));
}