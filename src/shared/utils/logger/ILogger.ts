// eslint-disable-next-line no-console
const log = console.log;

type Message = string;

export interface ILogger {
  id: string;
  server(message: Message): void;
  success(message: Message): void;
  info(message: Message): void;
  debug(message: Message): void;
  warn(message: Message): void;
  error(message: Message): void;
}
