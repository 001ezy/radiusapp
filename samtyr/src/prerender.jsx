import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {App} from './main.jsx';
export default () => renderToStaticMarkup(<App/>);
