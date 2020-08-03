import React from 'react';
import { loadProgress } from '../utils';
import { Table } from 'react-bootstrap';
import { State } from './Practice';

export const Progress: React.FC = () => {
    const progress = loadProgress();
    const binned = progress.reduce((acc: number[][], val: State | null, currentIndex: number) => {
        const index = val === null ? 0 : val.repetitions;
        if (!acc[index]) {
            acc[index] = Array.of(currentIndex);
        } else {
            acc[index].push(currentIndex);
        }
        return acc;
    }, []);
    return <Table>
        <thead>
        <tr>
            <th>Bin</th>
            <th>Size</th>
            <th>Items</th>
        </tr>
        </thead>
        <tbody>
        {binned
            .map((value, index) => {
                return <tr key={index}>
                    <td>{index}</td>
                    <td>{value.length}</td>
                    <td>{value.join(", ")}</td>
                </tr>;
            })}
        </tbody>
    </Table>;
};
