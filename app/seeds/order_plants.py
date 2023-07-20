from app.models import db, OrderPlant, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_order_plants():
    order_plant1 = OrderPlant(
        orderId=1,
        plantId=1,
        quantity=1
    )
    order_plant1_2 = OrderPlant(
        orderId=1,
        plantId=2,
        quantity=1
    )

    order_plant2 = OrderPlant(
        orderId=2,
        plantId=2,
        quantity=1
    )
    order_plant3 = OrderPlant(
        orderId=3,
        plantId=3,
        quantity=1
    )


    db.session.add(order_plant1)
    db.session.add(order_plant1_2)
    db.session.add(order_plant2)
    db.session.add(order_plant3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_order_plants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_plants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM order_plants"))

    db.session.commit()
