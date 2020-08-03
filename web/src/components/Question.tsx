import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { arrayEquals } from '../utils';
import { useTranslations } from '../hooks/translations/useTranslations';

interface Props {
    question: Question,
    review: boolean,
    selected: boolean[],
    invert: (index: number) => void,
    evaluate: () => void,
    continue: (wasCorrect: boolean) => void,
}

export interface Question {
    title: string,
    options: Option[],
}

interface Option {
    content: string,
    justification: string,
    isCorrect: boolean,
}

export const Question: React.FC<Props> = props => {
    const t = useTranslations();
    return <Card>
        <Card.Header>
            <Card.Title>{props.question.title}</Card.Title>
        </Card.Header>
        <ListGroup className="list-group-flush">
            {props.question.options.map((option, index) => {
                return <OptionItem
                    key={index}
                    onClick={() => props.invert(index)}
                    option={option}
                    review={props.review}
                    selected={props.selected[index]}/>;
            })}
        </ListGroup>
        <Card.Footer>
            <Button className="float-right"
                    onClick={() => {
                        if (props.review) {
                            const wasCorrect = arrayEquals(props.selected, props.question.options.map(option => option.isCorrect));
                            props.continue(wasCorrect);
                        } else {
                            props.evaluate();
                        }
                    }}>{t('next')}</Button>
        </Card.Footer>
    </Card>;
};

interface OptionItemProps {
    option: Option,
    review: boolean,
    selected: boolean,
    onClick: () => void,
}

const OptionItem: React.FC<OptionItemProps> = props => {
    if (!props.review) {
        const style = props.selected ? 'list-group-item-primary' : '';
        return <ListGroup.Item className={style} style={{cursor: 'pointer'}} onClick={props.onClick}>
            {props.selected
                ? <FontAwesomeIcon icon={faCheckSquare}/>
                : <FontAwesomeIcon icon={faSquare}/>
            }
            <span style={{ paddingLeft: '0.5rem' }}>{props.option.content}</span>
        </ListGroup.Item>;
    } else {
        const style = props.selected === props.option.isCorrect ? 'list-group-item-success' : 'list-group-item-danger';
        return <ListGroup.Item className={style}>
            {props.selected
                ? <FontAwesomeIcon icon={faCheckSquare}/>
                : <FontAwesomeIcon icon={faSquare}/>
            }
            <span style={{ marginLeft: '0.5rem' }}>{props.option.content}</span>
            <div style={{ marginTop: '0.3rem' }}>{props.option.justification}</div>
        </ListGroup.Item>;
    }
};
