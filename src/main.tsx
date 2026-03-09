import { createRoot } from 'react-dom/client';
import MDXContent from './components/Content.mdx';
import './index.css'

const container = document.getElementById('root');
createRoot(container).render(<MDXContent />)
