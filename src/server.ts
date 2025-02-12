import app from './app';
import { PORT } from './utils/constants';


app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});