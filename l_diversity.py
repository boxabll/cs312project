# # functions for finding value of l given a dataset
# from collections import defaultdict

# def evaluate_l_diversity(dataset, quasi_identifiers, sensitive_attribute):
#     """
#     Evaluates l-diversity of a dataset.

#     Args:
#     dataset (list of dicts): The dataset to evaluate, where each entry is a dict representing a record.
#     quasi_identifiers (list of str): The attributes to consider as quasi-identifiers.
#     sensitive_attribute (str): The sensitive attribute to check for diversity.

#     Returns:
#     dict: A dictionary with the group keys and the diversity (number of unique sensitive values) in each group.
#     """
#     # Group the data by the quasi-identifiers
#     groups = defaultdict(list)
#     for record in dataset:
#         key = tuple(record[qi] for qi in quasi_identifiers)
#         groups[key].append(record[sensitive_attribute])
    
#     # Calculate the diversity for each group
#     l_diversity = {key: len(set(values)) for key, values in groups.items()}
    
#     return min(l_diversity.values())

# # Example usage
# data = [
#     {'id': 1, 'zipcode': '12345', 'age': '30-40', 'disease': 'Flu'},
#     {'id': 2, 'zipcode': '12345', 'age': '30-40', 'disease': 'Cold'},
#     {'id': 3, 'zipcode': '12345', 'age': '30-40', 'disease': 'Flu'},
#     {'id': 4, 'zipcode': '12345', 'age': '41-50', 'disease': 'Asthma'},
#     {'id': 5, 'zipcode': '67890', 'age': '30-40', 'disease': 'Diabetes'},
# ]

# quasi_ids = ['zipcode', 'age']
# sensitive_attr = 'disease'
# diversity = evaluate_l_diversity(data, quasi_ids, sensitive_attr)
# print(diversity)


import pandas as pd

def evaluate_l_diversity_df(dataframe, quasi_identifiers, sensitive_attribute):
    """
    Evaluates l-diversity of a dataset represented as a pandas DataFrame.

    Args:
    dataframe (pd.DataFrame): The DataFrame to evaluate.
    quasi_identifiers (list of str): The attributes to consider as quasi-identifiers.
    sensitive_attribute (str): The sensitive attribute to check for diversity.

    Returns:
    pd.DataFrame: A DataFrame with the group keys and the diversity (number of unique sensitive values) in each group.
    """
    # Group the data by the quasi-identifiers and calculate the number of unique sensitive values in each group
    diversity_df = dataframe.groupby(quasi_identifiers)[sensitive_attribute].nunique().reset_index()
    diversity_df.rename(columns={sensitive_attribute: 'l_diversity'}, inplace=True)
    
    return diversity_df

# Example usage
data = {
    'id': [1, 2, 3, 4, 5],
    'zipcode': ['12345', '12345', '12345', '12345', '67890'],
    'age': ['30-40', '30-40', '30-40', '41-50', '30-40'],
    'disease': ['Flu', 'Cold', 'Flu', 'Asthma', 'Diabetes']
}
df = pd.DataFrame(data)

quasi_ids = ['zipcode', 'age']
sensitive_attr = 'disease'
diversity_df = evaluate_l_diversity_df(df, quasi_ids, sensitive_attr)
print(diversity_df)
