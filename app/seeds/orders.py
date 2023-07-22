from app.models import db, Order, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_orders():
    order1 = Order(
        userId=1,
        isCheckedOut=True,
        status='Completed'
    )
    order2 = Order(
        userId=2,
        isCheckedOut=True,
        status='Completed'
    )
    order3 = Order(
        userId=3,
        isCheckedOut=True,
        status='Completed'
    )


    db.session.add(order1)
    db.session.add(order2)
    db.session.add(order3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
