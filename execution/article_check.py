from textblob.sentiments import PatternAnalyzer, NaiveBayesAnalyzer
import sys

def article_check(article):
    report_output=""
    article_result = NaiveBayesAnalyzer().analyze(article)
    if article_result.p_neg > article_result.p_pos:
        report_output = "Your article contains to much negative words"
        assessments_result = PatternAnalyzer().analyze(p1,keep_assessments=True).assessments
        assessments_words = [index[0][0] for index in assessments_result.assessments]
        report_output += "\nThose are the words that your article contains: "
        report_output += ' ' .join(assessments_words)
    print(report_output)

if __name__ == "main":
    arguments = sys.argv[1:]
    if len(arguments) > 0:
        first_argument = arguments[0]
        article_check(first_argument)
    else:
        print("No arguments provided.")
        raise NotImplementedError()