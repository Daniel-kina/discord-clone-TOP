interface Message {
  id: string;
  content: string;
  createdAt: string;
  editedAt?: string;
  file?: string;
  image?: string;

  user?: Record<string, any>;

  textChannel?: Record<string, any>;
  group?: Record<string, any>;
  privateChannel?: Record<string, any>;
}

export { Message };
