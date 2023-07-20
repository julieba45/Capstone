from app.models import db, Payment, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_payments():
    payment1 = Payment(
        userId=1,
        orderId=1,
        paymentAmount=200.0,
        status='completed',
    )
    payment2 = Payment(
        userId=2,
        orderId=2,
        paymentAmount=190.0,
        status='completed',
    )
    payment3 = Payment(
        userId=3,
        orderId=3,
        paymentAmount=70.0,
        status='completed',
    )


    db.session.add(payment1)
    db.session.add(payment2)
    db.session.add(payment3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_payments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.payments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM payments"))

    db.session.commit()
