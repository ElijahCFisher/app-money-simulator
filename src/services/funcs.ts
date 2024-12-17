import { SourceRowComponent } from "src/app/source-row/source-row.component"
import { SourceComponent } from "src/app/source/source.component"

export class Funcs {

  constructor(){}

  static sourceFromJson(json: {[name: string]: any}, scenario: number = -1): SourceComponent {
    var ret: SourceComponent = new SourceComponent()
    ret.name = json["name"]
    ret.id = json["id"]

    // looping through each row depending on which scenario it is
    for(var row of ((scenario != -1) ? json["scenarios"][scenario] : json["rows"])) {
      var rowComp: SourceRowComponent = new SourceRowComponent()
      if (Array.isArray(row)) {
        // rowComp.attributes = {}
        rowComp.attributes = []
        // console.log("!!!!!!!!\n!!!!!!!!\n!!!!!!!!\n!!!!!!!!\n!!!!!!!!\n")
        // console.log(row[0])
        // for (var i = 0; i < row.length; i++)
        for (var attribute of row)
          rowComp.attributes.push(attribute)
      }
      else
        rowComp.source = this.sourceFromJson(row)
      ret.rows.push(rowComp)
    }
    return ret
  }

  static jsonFromSource(source: SourceComponent): {[name: string]: any} {
    var ret: {[name: string]: any} = {
      "name": source.name,
      "id": source.id,
      "rows": []
    }

    // looping through each row
    for(var row of source.rows) {
      var rowJson: string[][] = []
      var nextSource: {[name: string]: any} = {}
      if (!row.source) {
        console.log(row.attributes)
        for (var attribute of row.attributes!)
          rowJson.push([attribute[0], attribute[1]])
      }
      else
        nextSource = this.jsonFromSource(row.source)
      ret["rows"].push((rowJson.length == 0 ? nextSource : rowJson))
    }
    return ret
  }
}
