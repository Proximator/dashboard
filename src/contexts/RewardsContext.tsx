import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

interface Reward { date: string, id?: number, points: number, description: string, expirationDate: string, discount: number, gender: string, status: boolean }

interface RewardsContextType {
    rewards: Reward[];
    createReward: (reward: Reward) => Promise<void>;
}

export const RewardsContext = createContext<RewardsContextType>(null as RewardsContextType);

const createData = (date, id, points, description, expirationDate, discount, gender, status): Reward => {
    return { date, id, points, description, expirationDate, discount, gender, status };
}

const rowsInitial = [
    createData('07.10.2020', 1, 23, 'reward 1', '07/12/2021', 20, 'all', true),
    createData('07.10.2020', 2, 50, 'reward 2', '07/12/2021', 20, 'female', false),
    createData('07.10.2020', 1, 23, 'reward 1', '07/12/2021', 20, 'all', true),
    createData('07.10.2020', 2, 50, 'reward 2', '07/12/2021', 20, 'female', false)
];

export const RewardsProvider = ({ children } : { children: ReactNode }): JSX.Element => {
    const [rewards, setRewards] = useState<Reward[]>([]);

    useEffect(() => {
        setRewards(rowsInitial);
    }, []);

    const createReward = (reward: Reward): Promise<void> => {
        console.log({reward});
        return new Promise((res) => {
            setTimeout(() => {
                setRewards((prev) => [...prev, reward]);
                console.log('done from function')
                res();
            }, 3000);
        })
    } 
    return <RewardsContext.Provider value={{ rewards, createReward}}>{children}</RewardsContext.Provider>;
};

export const useRewards = (): RewardsContextType =>
    useContext(RewardsContext) as RewardsContextType;
