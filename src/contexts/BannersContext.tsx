import axios from '../utils/axios';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

import { Banner } from '../types';
import { useAuth } from './AuthContext';

interface BannersContextType {
  banners: Banner[];
  createBanner: (banner: Banner) => Promise<void>;
  deleteBanners: (ids: number[]) => Promise<void>;
}

export const BannersContext = createContext<BannersContextType>({
  banners: [],
  createBanner: (banner: Banner) => new Promise((res) => res()),
  deleteBanners: (ids: number[]) => new Promise((res) => res())
} as BannersContextType);

export const BannersProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const { businessId } = useAuth();

  useEffect(() => {
    getBanners().then((banners) => revalidateBanners({ banners }));
  }, []);

  const revalidateBanners = ({ banners }: { banners: Banner[] }): void => {
    setBanners(banners);
  };

  const getBanners = async (): Promise<Banner[]> => {
    try {
      const res = await axios.get(`/marketing/banners?businessId=${businessId}`);
      let data = res.data as Banner[] | '';
      return data === '' ? [] : data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const createBanner = async (banner: Banner): Promise<void> => {
    console.log({ banner });
    const body = new FormData();
    body.append(
      'dto',
      `{"brandId": null,  "businessId": ${businessId},  "link": "${banner.link}",  "expiredAt": "${new Date(
        banner.expiredAt
      ).toISOString()}",  "isActive": "${banner.isActive}",  "targetGender": "${banner.targetGender}"}`
    );
    body.append('image', `@${banner.imageURL};type=${banner.imageURL.type}`);
    // body.append('image', `@${news.imageURL};type=${news.imageURL.type}`);

    try {
      const res = await axios.post(`/marketing/banners`, body, {
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data'
        }
      });
      getBanners().then((banners) => revalidateBanners({ banners }));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBanners = async (ids: number[]): Promise<void> => {
    try {
      await Promise.all(ids.map((e) => `/marketing/banners/${e}`).map((e) => axios.delete(e)));
      const newBanners = banners.filter((e) => e.id && !ids.includes(e.id));
      setBanners(newBanners);
    } catch (err) {
      console.log({ err });
    }
  };

  return <BannersContext.Provider value={{ banners, createBanner, deleteBanners }}>{children}</BannersContext.Provider>;
};
export const useBanners = (): BannersContextType => useContext(BannersContext) as BannersContextType;
