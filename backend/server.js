
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/presentationDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

const ChartDataSchema = new mongoose.Schema({
    title:String,
    labels: [String],
    values: [Number]
});

const FormSchema = new mongoose.Schema({
    openingSlide: String,
    images: [String],
    chartData: ChartDataSchema,
    codeBlock: String,
    pythonCode: String,
    closingSlide: String
});

const FormData = mongoose.model('FormData', FormSchema);

app.post('/submit', async (req, res) => {
    try {
        console.log('Received form data:', req.body);

        // Ensure chartData is in the correct format
        const { chartData } = req.body;
        console.log('charData',chartData);
        
        if (chartData && Array.isArray(chartData.value)) {
            chartData.value = chartData.value.map(value => parseFloat(value));
        }

        // Check if a document already exists
        let existingFormData = await FormData.findOne();

        if (existingFormData) {
            console.log('Existing data found:', existingFormData.chartData);

            // Update the existing document with the new data
            existingFormData.openingSlide = req.body.openingSlide;
            existingFormData.images = req.body.images;
            existingFormData.codeBlock = req.body.codeBlock;
            existingFormData.pythonCode = req.body.pythonCode;
            existingFormData.closingSlide = req.body.closingSlide;

            // Update chartData using the spread operator or MongoDB update
            
            existingFormData.chartData = {
                ...existingFormData.chartData,
                title: chartData.title,
                labels: chartData.labels,
                values: chartData.values,
            };


            await existingFormData.save();
            res.status(200).send('Form data updated successfully');
            console.log("Data updated in the DB");
            console.log('Updated data:', req.body);
        } else {
            // Create a new document
            const formData = new FormData(req.body);
            await formData.save();
            res.status(200).send('Form data saved successfully');
            console.log("New data saved to the DB");
            console.log('Saved data:', req.body);
        }

    } catch (err) {
        res.status(500).send('Failed to save or update form data');
        console.error('Error during form data save/update:', err);
    }
});

// Route to retrieve data from the database
app.get('/data', async (req, res) => {
    try {
        const data = await FormData.findOne();
        if (data) {
            res.json(data);
        } else {
            console.log('No data found in DB');
            res.status(404).send('No data found');
        }
    } catch (err) {
        console.error('Failed to retrieve form data:', err);
        res.status(500).send('Failed to retrieve form data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

