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
    axios
      .get(`loyalty/rewards?businessId=${businessId}&brandId=${1}`)
      .then((res) => {
        console.log(res.data);
        const { data } = res;
        setRewards(data as Reward[]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const createReward = (reward: Reward): Promise<void> => {
    console.log({ reward });
    return new Promise((res) => {
      try {
        // setTimeout(() => {
        //     setAddReward(reward);
        //     console.log('done from RewardsContext')
        //     res();
        // }, 3000);
        // axios.post('http://75.119.140.14:8081/api/v1/loyalty/rewards',{
        //     reward
        //     // "brandId": 0,
        //     // "businessId": 0,
        //     // "description": "string",
        //     // "discount": 0,
        //     // "expireDate": "2021-12-07T13:05:40.236Z",
        //     // "id": 0,
        //     // "isActive": true,
        //     // "isEngineering": true,
        //     // "points": 0,
        //     // "targetGender": "ALL",
        //     // "bussiness":"slkdf"
        // })
        // .then(res => console.log(res.data))
        // .catch(err => console.log(err.message));
      } catch (error) {
        console.log(error);
      }
    });
  };

  const deleteRewards = (ids: number[]): Promise<void> => {
    const newRewards = rewards.filter((e) => e.id && !ids.includes(e.id));
    return new Promise((res) => {
      setTimeout(() => {
        setRewards([...newRewards]);
        console.log('done from function');
        res();
      }, 300);
    });
  };

  return <RewardsContext.Provider value={{ rewards, createReward, deleteRewards }}>{children}</RewardsContext.Provider>;
};

export const useRewards = (): RewardsContextType => useContext(RewardsContext) as RewardsContextType;
