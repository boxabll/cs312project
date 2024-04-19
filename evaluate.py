import sys
import os
import pandas as pd

# main file - take in dataset and relevant column info (which is sensitive data) as input, display k and l values as output
import k_anonymity
import l_diversity

# evalulate <dataset> <sensitive column name> <index column>
def main():
    args = sys.argv
    if len(args) < 3:
        print("Missing argument", file=sys.stderr)
        return

    filename = args[1]
    sensitive_column = args[2]
    index_column = ""

    if len(args) == 4:
        index_column = args[3]

    if not os.path.exists(filename):
        print("data file not found", file=sys.stderr)
        return
    
    filetype = filename.split(".")[-1]
    if filetype != "csv":
        print("invalid file format", file=sys.stderr)
        return

    print("Sensitive column: ", sensitive_column)

    try:
        dataset = pd.read_csv(filename)
    except:
        print("Error reading csv into pandas dataframe")

    try:
        print("k =",k_anonymity.k_anonymity(df=dataset, sensitive_column=sensitive_column, index_column=index_column))
    except:
        print("Error evaluating k anonymity", file=sys.stderr)

    try:
        print("l =",l_diversity.evaluate_l_diversity(df=dataset, sensitive_column=sensitive_column))
    except:
        print("Error evaluating l diversity", file=sys.stderr)

if __name__ == "__main__":
    main()
