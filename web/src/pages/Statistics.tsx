import React from 'react';
import { loadProgress } from '../utils';
import { Table } from 'react-bootstrap';

export const Statistics: React.FC = () => {
    const progress = loadProgress();
    return <Table>
        <thead>
        <tr>
            <th>#</th>
            <th>Correctly Answered</th>
        </tr>
        </thead>
        <tbody>
        {progress
            .map((value, index) =>
                value === null
                    ? null
                    : <tr key={index}>
                        <td>{index}</td>
                        <td>{value?.repetitions}</td>
                    </tr>)}
        </tbody>
    </Table>;
};
