import { remarkConfig } from '../configs/remark';

export const parseMarkdown = (markdown: string) => remarkConfig.processSync(markdown).toString();
