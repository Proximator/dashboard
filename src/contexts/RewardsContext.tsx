import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

import { Reward, Gender } from "../types";

interface RewardsContextType {
    rewards: Reward[];
    createReward: (reward: Reward) => Promise<void>;
    deleteRewards: (ids: number[]) => Promise<void>
}

export const RewardsContext = createContext<RewardsContextType>({
    rewards: [],
    createReward: (reward: Reward) => new Promise((res) => res()),
    deleteRewards: (ids: number[]) => new Promise((res) => res())
} as RewardsContextType);

const createData = (date: string, id: number, points: number, description: string, expirationDate: string, discount: number, gender: Gender, status: boolean): Reward => {
    return { date, id, points, description, expirationDate, discount, gender, status };
}

const rowsInitial = [
    createData('07.10.2020', 1, 23, 'reward 1', '07/12/2021', 20, 'all', true),
    createData('07.10.2020', 2, 50, 'reward 2', '07/12/2021', 20, 'female', false),
    createData('07.10.2020', 3, 23, 'reward 1', '07/12/2021', 20, 'all', true),
    createData('07.10.2020', 4, 50, 'reward 2', '07/12/2021', 20, 'female', false)
];

export const RewardsProvider = ({ children } : { children: ReactNode }): JSX.Element => {
    const [rewards, setRewards] = useState<Reward[]>(rowsInitial);

    const createReward = (reward: Reward): Promise<void> => {
        console.log({reward});
        return new Promise((res) => {
            setTimeout(() => {
                setRewards((prev) => [...prev, reward]);
                console.log('done from function')
                res();
            }, 300);
        })
    } 

    const deleteRewards = (ids: number[]): Promise<void> => {
        const newRewards = rewards.filter(e => e.id && !ids.includes(e.id));
        return new Promise((res) => {
            setTimeout(() => {
                setRewards([...newRewards]);
                console.log('done from function')
                res();
            }, 300);
        })
    }   

    return <RewardsContext.Provider value={{ rewards, createReward, deleteRewards }}>{children}</RewardsContext.Provider>;
};

export const useRewards = (): RewardsContextType =>
    useContext(RewardsContext) as RewardsContextType;
