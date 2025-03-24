import 'express-session';

declare module 'express-session' {
  interface SessionData {
    adminLogin?: {
      otp: string;
      mobile_no: string;
      email: string;
    };
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    session: Session & Partial<SessionData>;
  }
}