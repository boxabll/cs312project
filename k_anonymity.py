# functions for finding value of k given a dataset
import pandas as pd

def find_k(df, sensitive_column):

    groups = df.groupby(df.columns.difference(['sensitive_column']))

    group_sizes = groups.size()

    min_group_size = group_sizes.min()

    return min_group_size