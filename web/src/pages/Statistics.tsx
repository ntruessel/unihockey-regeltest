import React from 'react';
import { loadProgress } from '../utils';
import { Table } from 'react-bootstrap';

const progress = loadProgress();

export const Statistics: React.FC = () => {
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
                    ? <></>
                    : <tr key={index}>
                        <td>{index}</td>
                        <td>{value?.repetitions}</td>
                    </tr>)}
        </tbody>
    </Table>;
};
