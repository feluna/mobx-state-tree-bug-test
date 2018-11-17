import { types, destroy } from "mobx-state-tree"

export const Branch = types.model("Branch", {
  id: types.identifierNumber,
  name: types.string
})
.actions(self => ({
  afterCreate() {
    console.log("BRANCH AFTER CREATE", self)
  },
  afterAttach() {
    console.log("BRANCH AFTER ATTACH", self)
  }
}))

export const User = types.model("User", {
  id: types.identifierNumber,
  email: types.maybeNull(types.string),
  branches: types.maybeNull(types.array(Branch))
})
.actions(self => ({
  afterCreate() {
    console.log("USER AFTER CREATE", self)
  },
  afterAttach() {
    console.log("USER AFTER ATTACH", self)
  }
}))

export const BranchStore = types.model("BranchStore", {
  activeBranch: types.maybeNull(types.reference(Branch))
})
.actions(self => ({
  setActiveBranch(branchId) {
    self.activeBranch = branchId
  }
}))

export const RootStore = types.model("RootStore", {
  user: types.maybeNull(User),
  branchStore: types.maybeNull(BranchStore)
})
.actions(self => ({
  setUser(snapshot) {
    self.user = snapshot
  },
  setBranchStore(snapshot) {
    self.branchStore = snapshot
  },
  destroyUser() {
    destroy(self.user)
  },
  destroyBranchStore() {
    destroy(self.branchStore)
  }
}))
