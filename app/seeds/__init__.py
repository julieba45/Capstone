from flask.cli import AppGroup
from .users import seed_users, undo_users
from .favorites import seed_favorites, undo_favorites
from .images import seed_plantimages, undo_plantimages
from .order_plants import seed_order_plants, undo_order_plants
from .reviews import seed_reviews, undo_reviews
from .payments import seed_payments, undo_payments
from .plants import seed_plants, undo_plants
from .orders import seed_orders, undo_orders

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_plantimages()
        undo_payments()
        undo_reviews()
        undo_favorites()
        undo_order_plants()
        undo_orders()
        undo_plants()
        undo_users()
    seed_users()
    seed_plants()
    seed_orders()
    seed_order_plants()
    seed_favorites()
    seed_reviews()
    seed_payments()
    seed_plantimages()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_plantimages()
    undo_payments()
    undo_reviews()
    undo_favorites()
    undo_order_plants()
    undo_orders()
    undo_plants()
    undo_users()
    # Add other undo functions here
