from pulp import *

def optimize_supply_chain(blocked_routes=None):
    """
    Solves the logistics network for minimum cost.
    blocked_routes: List of strings (e.g., ["Suez_Canal"])
    """
    if blocked_routes is None:
        blocked_routes = []

    # --- 1. Define the Network ---
    # (Route Name): [Cost per unit, Max Capacity]
    network = {
        "Suez_Canal": {"cost": 550, "capacity": 1000},
        "Cape_of_Good_Hope": {"cost": 850, "capacity": 1200},
        "Air_Freight": {"cost": 2500, "capacity": 5000},
        "Rail_Eurasia": {"cost": 1100, "capacity": 400}
    }

    # --- 2. Initialize LP Problem ---
    prob = LpProblem("Supply_Chain_Optimization", LpMinimize)

    # --- 3. Decision Variables ---
    # How many units to send via each route
    route_vars = LpVariable.dicts("Shipment", network.keys(), lowBound=0, cat='Continuous')

    # --- 4. Objective Function (Minimize Cost) ---
    prob += lpSum([route_vars[r] * network[r]["cost"] for r in network.keys()])

    # --- 5. Constraints ---
    demand = 800  # Total units we need to move
    prob += lpSum([route_vars[r] for r in network.keys()]) == demand

    # Apply Blockages (Real-world shocks)
    for r in network.keys():
        # If route is blocked, capacity is 0. Otherwise, use standard capacity.
        max_cap = 0 if r in blocked_routes else network[r]["capacity"]
        prob += route_vars[r] <= max_cap

    # --- 6. Solve ---
    # Use the default CBC solver (included with PuLP)
    prob.solve(PULP_CBC_CMD(msg=0))

    # --- 7. Format Result ---
    allocations = {r: route_vars[r].varValue for r in network.keys() if route_vars[r].varValue > 0}
    
    return {
        "status": LpStatus[prob.status],
        "total_cost": value(prob.objective),
        "allocations": allocations,
        "disruptions_active": blocked_routes
    }