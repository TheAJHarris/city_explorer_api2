'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;






















app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`));
