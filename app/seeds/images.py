from app.models import db, PlantImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_plantimages():
    plant_image1 = PlantImage(
        plantId=1,
        pictureURL='https://s7d1.scene7.com/is/image/terrain/68255488_000_a?$zoom2$',
        isPrimary=True
    )
    plant_image1_1 = PlantImage(
        plantId=1,
        pictureURL='https://s7d1.scene7.com/is/image/terrain/68255488_000_b?$zoom2$',
        isPrimary=False
    )
    plant_image2 = PlantImage(
        plantId=2,
        pictureURL='https://s7d1.scene7.com/is/image/terrain/68265743_000_a?$zoom2$',
        isPrimary=True
    )
    plant_image2_1 = PlantImage(
        plantId=2,
        pictureURL='https://s7d1.scene7.com/is/image/terrain/68265743_000_b?$zoom2$',
        isPrimary=False
    )
    plant_image3 = PlantImage(
        plantId=3,
        pictureURL='https://bloomist.com/cdn/shop/products/Bot_Live_Kokedama_Ficus_062421_DC_01_0737_1_700x.jpg?v=1679545147',
        isPrimary=True
    )
    plant_image3_1 = PlantImage(
        plantId=3,
        pictureURL='https://bloomist.com/cdn/shop/products/Bot_Live_Kokedama_Ficus_062421_DC_01_0754_1_700x.jpg?v=1679545147',
        isPrimary=False
    )
    plant_image3_2 = PlantImage(
        plantId=3,
        pictureURL='https://bloomist.com/cdn/shop/products/DecAcc_Objets_Atuto_BookEnds_Stone_Books_121421_DC_1186_700x.jpg?v=1679545147',
        isPrimary=False
    )


    db.session.add(plant_image1)
    db.session.add(plant_image1_1)
    db.session.add(plant_image2)
    db.session.add(plant_image2_1)
    db.session.add(plant_image3)
    db.session.add(plant_image3_1)
    db.session.add(plant_image3_2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_plantimages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.plantimages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM plantimages"))

    db.session.commit()
