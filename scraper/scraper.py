import json
import requests
import time
from lxml import html


def is_question(tree):
    return len(tree.cssselect('main form')) != 0


def parse_question(tree):
    return {
        'question': parse_question_text(tree),
        'answers': parse_answers(tree)
    }


def parse_question_text(tree):
    return tree.cssselect('div.question')[0].text_content()


def parse_answers(tree):
    answers = tree.cssselect('div.answer')
    correctness = [len(a.cssselect('div.correct')) != 0 for a in answers]
    justifications = tree.cssselect('div.justification')
    return [
        {
            'answer': (a.cssselect('div.correct')[0].text_content() if c else a.cssselect('div.wrong')[
                0].text_content())[3:],
            'justification': j.text_content().replace('\r\n', ' '),
            'correct': c
        } for a, j, c in zip(answers, justifications, correctness)]


def read_question(num, lang="de"):
    session = requests.Session()
    session.get(f"https://regeltest.swissunihockey.ch/{lang}/online-test/training?question_no={num}")
    response = session.get(f"https://regeltest.swissunihockey.ch/{lang}/online-test/training?check=Weiter+%C2%BB")
    page = html.fromstring(response.content)
    tree = page.cssselect('main form')[0]
    print(parse_question(tree))


def scrape_questions(lang="de"):
    questions = []
    num = 1
    while True:
        session = requests.Session()
        session.get(f"https://regeltest.swissunihockey.ch/{lang}/online-test/training?question_no={num}")
        response = session.get(f"https://regeltest.swissunihockey.ch/{lang}/online-test/training?check=Weiter+%C2%BB")
        page = html.fromstring(response.content)
        if not is_question(page):
            return questions
        tree = page.cssselect('main form')[0]
        questions.append(parse_question(tree))
        print(num)
        num += 1
        time.sleep(0.1)


if __name__ == '__main__':
    questions = scrape_questions()
    with open('questions.json', 'w') as outfile:
        json.dump(questions, outfile, indent=4)
