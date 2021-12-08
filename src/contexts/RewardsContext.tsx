import axios from '../utils/axios';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

import { Reward } from '../types';
import { useAuth } from './AuthContext';

interface RewardsContextType {
  rewards: Reward[];
  createReward: (reward: Reward) => Promise<void>;
  deleteRewards: (ids: number[]) => Promise<void>;
}

export const RewardsContext = createContext<RewardsContextType>({
  rewards: [],
  createReward: (reward: Reward) => new Promise((res) => res()),
  deleteRewards: (ids: number[]) => new Promise((res) => res())
} as RewardsContextType);

export const RewardsProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const { businessId } = useAuth();
  useEffect(() => {
    getRewards().then(rewards => revalidateRewards({rewards}) )
  }, []);

  const revalidateRewards = ({rewards} : {rewards: Reward[]}): void => {
    setRewards(rewards);
  }

  const getRewards = async (): Promise<Reward[]> => {
    try{
    const res = await axios.get(`loyalty/rewards?businessId=${businessId}`)
      let data = res.data as Reward[] | '';
      return data === ''? [] : data;
    }
    catch(error) {
      return [];
    };
  }

  const createReward = async (reward: Reward): Promise<void> => {
    console.log({reward});
    try{
      const res = await axios.post('loyalty/rewards',{
          ...reward,
          expireDate: new Date(reward.expireDate).toISOString(),
          businessId,
          brandId: 0,
      })
      getRewards().then(rewards => revalidateRewards({rewards}));
    }catch(error){
        console.log(error);
    }
} 

  const deleteRewards = async (ids: number[]): Promise<void> => {
    try {
      await Promise.all(ids
        .map(e => `loyalty/rewards/${e}`)
        .map(e => axios.delete(e)))
        const newRewards = rewards.filter((e) => e.id && !ids.includes(e.id));
        setRewards(newRewards);
    }catch(err){
      console.log({err});
    }
  };

  return <RewardsContext.Provider value={{ rewards, createReward, deleteRewards }}>{children}</RewardsContext.Provider>;

}
export const useRewards = (): RewardsContextType => useContext(RewardsContext) as RewardsContextType;
