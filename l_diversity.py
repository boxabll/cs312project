# functions for finding value of l given a dataset
import pandas as pd

def evaluate_min_l_diversity(dataframe, quasi_identifiers, sensitive_attribute):
    """
    Evaluates the minimum l-diversity of a dataset represented as a pandas DataFrame.

    Args:
    dataframe (pd.DataFrame): The DataFrame to evaluate.
    quasi_identifiers (list of str): The attributes to consider as quasi-identifiers.
    sensitive_attribute (str): The sensitive attribute to check for diversity.

    Returns:
    int: The minimum number of unique sensitive values found across all groups.
    """
    # Group the data by the quasi-identifiers and calculate the number of unique sensitive values in each group
    diversity_series = dataframe.groupby(quasi_identifiers)[sensitive_attribute].nunique()

    # Find the minimum diversity value
    min_diversity = diversity_series.min()

    return min_diversity

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
min_diversity = evaluate_min_l_diversity(df, quasi_ids, sensitive_attr)
print(f"l-diversity: {min_diversity}")