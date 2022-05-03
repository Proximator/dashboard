import axios from '../utils/axios';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

import { News } from '../types';
import { useAuth } from './AuthContext';

interface NewsCollectionContextType {
  newsCollection: News[];
  createNews: (news: News) => Promise<void>;
  deleteNewsCollection: (ids: number[]) => Promise<void>;
}

export const NewsCollectionContext = createContext<NewsCollectionContextType>({
  newsCollection: [],
  createNews: (news: News) => new Promise((res) => res()),
  deleteNewsCollection: (ids: number[]) => new Promise((res) => res())
} as NewsCollectionContextType);

export const NewsCollectionProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [newsCollection, setNewsCollection] = useState<News[]>([]);
  const { businessId } = useAuth();

  useEffect(() => {
    getNewsCollection().then((newsCollection) => revalidateNewsCollection({ newsCollection }));
  }, []);

  const revalidateNewsCollection = ({ newsCollection }: { newsCollection: News[] }): void => {
    setNewsCollection(newsCollection);
  };

  const getNewsCollection = async (): Promise<News[]> => {
    try {
      const res = await axios.get(`/marketing/news?businessId=${businessId}`);
      let data = res.data as News[] | '';
      console.log({ data });
      return data === '' ? [] : data;
    } catch (error) {
      console.log({ error });
      return [];
    }
  };

  const createNews = async (news: News): Promise<void> => {
    console.log({ news });
    let body = new FormData();
    body.append(
      'dto',
      `{
        "brandId": null,
        "businessId": ${businessId},
        "subject": "${news.subject}",
        "content": "${news.content}",
        "expiredAt": "${new Date(news.expiredAt).toISOString()}",
        "isActive": "${news.isActive}",
        "launchDate": "${new Date(news.launchDate).toISOString()}",
        "targetGender": "${news.targetGender}"
    }`
    );
    body.append('image', `@${news.imageURL};type=${news.imageURL.type}`);
    // body.append('image', `@${news.imageURL};type=${news.imageURL.type}`);

    try {
      const res = await axios.post(`/marketing/news`, body, {
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data'
        }
      });
      getNewsCollection().then((newsCollection) => revalidateNewsCollection({ newsCollection }));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNewsCollection = async (ids: number[]): Promise<void> => {
    try {
      await Promise.all(ids.map((e) => `/marketing/news/${e}`).map((e) => axios.delete(e)));
      const newNewsCollection = newsCollection.filter((e) => e.id && !ids.includes(e.id));
      setNewsCollection(newNewsCollection);
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <NewsCollectionContext.Provider value={{ newsCollection, createNews, deleteNewsCollection }}>{children}</NewsCollectionContext.Provider>
  );
};
export const useNewsCollection = (): NewsCollectionContextType => useContext(NewsCollectionContext) as NewsCollectionContextType;
