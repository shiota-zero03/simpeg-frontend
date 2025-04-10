import {
  TreeInfo,
  Node,
  LayoutAnimation,
  HierarchicalTree,
  DataBinding,
  DiagramComponent,
  NodeModel,
  ConnectorModel,
  ConnectorConstraints,
  SnapConstraints,
  Inject,
  DiagramTools,
} from "@syncfusion/ej2-react-diagrams";
import { DataManager } from "@syncfusion/ej2-data";
import { localBindData } from "@/constants/DummyData";

// Interface untuk informasi pegawai
export interface EmployeeInfo {
  Role: string;
  color: string;
}

export interface DataInfo {
  [key: string]: string;
}

function OrganizationModel() {
  // Fungsi untuk mengatur pengaturan node default
  function nodeDefaults(obj: Node): Node {
    obj.backgroundColor = (obj.data as EmployeeInfo).color;
    obj.style = { fill: "none", strokeColor: "none", color: "white" };
    obj.expandIcon = {
      height: 10,
      width: 10,
      shape: "None",
      fill: "lightgray",
      offset: { x: 0.5, y: 1 },
    };
    obj.expandIcon.verticalAlignment = "Center";
    obj.expandIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.collapseIcon = {
      height: 10,
      width: 10,
      shape: "None",
      fill: "lightgray",
      offset: { x: 0.5, y: 1 },
    };
    obj.collapseIcon.verticalAlignment = "Center";
    obj.collapseIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.width = 120;
    obj.height = 30;
    return obj;
  }

  // Fungsi untuk mengatur pengaturan konektor default
  function connectorDefaults(connector: ConnectorModel): ConnectorModel {
    if (connector.targetDecorator) {
      connector.targetDecorator.shape = "None";
    }
    connector.type = "Orthogonal";
    connector.constraints = ConnectorConstraints.None;
    connector.cornerRadius = 0;
    return connector;
  }

  return (
    <div className="control-pane diagram-organization">
      <div className="col-lg-8 control-section">
        <div className="content-wrapper" style={{ width: "100%" }}>
          <DiagramComponent
            id="diagram"
            width={"100%"}
            height={"700px"}
            snapSettings={{ constraints: SnapConstraints.None }}
            dataSourceSettings={{
              id: "Id",
              parentId: "Manager",
              dataSource: new DataManager(localBindData as unknown as JSON[]),
              doBinding: (nodeModel: NodeModel, data: object) => {
                nodeModel.shape = {
                  type: "Text",
                  content: (data as EmployeeInfo).Role,
                  margin: { left: 10, right: 10, top: 10, bottom: 10 },
                };
              },
            }}
            tool={DiagramTools.ZoomPan}
            layout={{
              type: "OrganizationalChart",
              getLayoutInfo: (node: Node, options: TreeInfo) => {
                if ((node.data as DataInfo)["Role"] === "General Manager") {
                  if (options.assistants && options.children) {
                    options.assistants.push(options.children[0]);
                    options.children.splice(0, 1);
                  }
                }
                if (!options.hasSubTree) {
                  options.type = "Right";
                }
              },
            }}
            getNodeDefaults={(obj: Node) => nodeDefaults(obj)}
            getConnectorDefaults={(connector: ConnectorModel) =>
              connectorDefaults(connector)
            }
          >
            <Inject
              services={[DataBinding, HierarchicalTree, LayoutAnimation]}
            />
          </DiagramComponent>
        </div>
      </div>
    </div>
  );
}

export default OrganizationModel;
