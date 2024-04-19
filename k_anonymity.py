# functions for finding value of k given a dataset
import pandas as pd

def k_anonymity(df, sensitive_column, index_column):
    groups = df.groupby(list(df.columns.difference([sensitive_column, index_column])))

    group_sizes = groups.size()

    min_group_size = group_sizes.min()

    return min_group_size

# 2 equivalence classes
# data = [
#     {'id': 1, 'zipcode': '12345', 'age': '30-40', 'disease': 'Flu'},
#     {'id': 2, 'zipcode': '12345', 'age': '30-40', 'disease': 'Cold'},
#     {'id': 3, 'zipcode': '12345', 'age': '30-40', 'disease': 'Flu'},
#     {'id': 4, 'zipcode': '67890', 'age': '41-50', 'disease': 'Asthma'},
#     {'id': 5, 'zipcode': '67890', 'age': '41-50', 'disease': 'Diabetes'},
# ]

# sensitive_attr = 'disease'
# k = find_k(pd.DataFrame.from_dict(data), sensitive_attr, '')
# print(k)