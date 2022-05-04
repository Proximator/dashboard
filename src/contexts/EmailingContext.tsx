import axios from '../utils/axios';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

import { Email } from '../types';
import { useAuth } from './AuthContext';

interface EmailsContextType {
  emails: Email[];
  createEmail: (email: Email) => Promise<void>;
  deleteEmails: (ids: number[]) => Promise<void>;
}

export const EmailsContext = createContext<EmailsContextType>({
  emails: [],
  createEmail: (email: Email) => new Promise((res) => res()),
  deleteEmails: (ids: number[]) => new Promise((res) => res())
} as EmailsContextType);

export const EmailsProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [emails, setEmails] = useState<Email[]>([]);
  const { businessId } = useAuth();

  useEffect(() => {
    getEmails().then((emails) => revalidateEmails({ emails }));
  }, []);

  const revalidateEmails = ({ emails }: { emails: Email[] }): void => {
    setEmails(emails);
  };

  const getEmails = async (): Promise<Email[]> => {
    try {
      const res = await axios.get(`/marketing/campaigns?businessId=${businessId}`);
      let data = res.data as Email[] | '';
      console.log({ data });
      return data === '' ? [] : data;
    } catch (error) {
      console.log({ error });
      return [];
    }
  };

  const createEmail = async (email): Promise<void> => {
    console.log({ email });
    let body = new FormData();
    body.append(
      'dto',
      `{
      "launchDate": "${new Date(email.launchDate).toISOString()}",
      "content": "${email.content}",
      "businessId": ${businessId},
      "brandId": null,
      "subject": "${email.subject}",
      "targetedUsers": "${email.targetedUsers}",
      "status": "${email.status}",
      "createDate": "${new Date(email.createDate).toISOString()}",
      "targetGroup": "${email.targetGroup}"
    }`
    );
    // body.append('image', `${email.imageURL.name};type=${email.imageURL.type}`);
    // body.append('image', `${email.imageURL.name};type=${email.imageURL.type}`);

    try {
      const res = await axios.post(`/marketing/campaigns`, body, {
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data'
        }
      });
      getEmails().then((emails) => revalidateEmails({ emails }));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmails = async (ids: number[]): Promise<void> => {
    try {
      await Promise.all(ids.map((e) => `/marketing/campaigns/${e}`).map((e) => axios.delete(e)));
      const newEmails = emails.filter((e) => e.id && !ids.includes(e.id));
      setEmails(newEmails);
    } catch (err) {
      console.log({ err });
    }
  };

  return <EmailsContext.Provider value={{ emails, createEmail, deleteEmails }}>{children}</EmailsContext.Provider>;
};
export const useEmails = (): EmailsContextType => useContext(EmailsContext) as EmailsContextType;
