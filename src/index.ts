import colors from 'colors';
import app from './server';


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(colors.bgGreen(`Server running on port ${port}`)));
