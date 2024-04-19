# functions for finding value of l given a dataset
from collections import defaultdict

def evaluate_l_diversity(dataset, quasi_identifiers, sensitive_attribute):
    """
    Evaluates l-diversity of a dataset.

    Args:
    dataset (list of dicts): The dataset to evaluate, where each entry is a dict representing a record.
    quasi_identifiers (list of str): The attributes to consider as quasi-identifiers.
    sensitive_attribute (str): The sensitive attribute to check for diversity.

    Returns:
    dict: A dictionary with the group keys and the diversity (number of unique sensitive values) in each group.
    """
    # Group the data by the quasi-identifiers
    groups = defaultdict(list)
    for record in dataset:
        key = tuple(record[qi] for qi in quasi_identifiers)
        groups[key].append(record[sensitive_attribute])
    
    # Calculate the diversity for each group
    l_diversity = {key: len(set(values)) for key, values in groups.items()}
    
    return min(l_diversity.values())

# Example usage
data = [
    {'id': 1, 'zipcode': '12345', 'age': '30-40', 'disease': 'Flu'},
    {'id': 2, 'zipcode': '12345', 'age': '30-40', 'disease': 'Cold'},
    {'id': 3, 'zipcode': '12345', 'age': '30-40', 'disease': 'Flu'},
    {'id': 4, 'zipcode': '12345', 'age': '41-50', 'disease': 'Asthma'},
    {'id': 5, 'zipcode': '67890', 'age': '30-40', 'disease': 'Diabetes'},
]

quasi_ids = ['zipcode', 'age']
sensitive_attr = 'disease'
diversity = evaluate_l_diversity(data, quasi_ids, sensitive_attr)
print(diversity)
