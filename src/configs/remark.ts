import remark from 'remark';
import html from 'remark-html';

export const remarkConfig = remark().use(html);
