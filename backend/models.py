from app import db

class Task(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable=False)
    time_due = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    importance = db.Column(db.String(50), nullable=False)
    img_url = db.Column(db.String(200), nullable=True)

    def to_json(self):
        return{
            "id":self.id,
            "name":self.name,
            "timeDue":self.time_due,
            "description":self.description,
            "importance":self.importance,
            "imgUrl":self.img_url,
        }

